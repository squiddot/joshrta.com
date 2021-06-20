<?php
/**
 * Site module for Craft CMS 3.x
 *
 * An example module for Craft CMS 3 that lets you enhance your websites with a
 * custom site module
 *
 * @link      https://nystudio107.com/
 * @copyright Copyright (c) 2019 nystudio107
 */

namespace modules\sitemodule\controllers;

use Craft;
use craft\web\Controller;

use doublesecretagency\upvote\Upvote;
use Solspace\Freeform\Freeform;
use yii\web\Response;

/**
 * @author    nystudio107
 * @package   SiteModule
 * @since     1.0.0
 */
class DefaultController extends Controller
{
    // Constants
    // =========================================================================

    const GQL_TOKEN_NAMES = [
        'Frontend'
    ];

    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = [
        'get-csrf',
        'get-gql-token',
        'get-field-options',
        'get-form-layout',
        'get-hearts',
        'add-heart',
        'remove-heart',
    ];

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function beforeAction($action): bool
    {
        // Disable CSRF validation for get-csrf POST requests
        if ($action->id === 'get-csrf') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    /**
     * @return Response
     */
    public function actionGetCsrf(): Response
    {
        return $this->asJson([
            'name' => Craft::$app->getConfig()->getGeneral()->csrfTokenName,
            'value' => Craft::$app->getRequest()->getCsrfToken(),
        ]);
    }

    /**
     * @return Response
     */
    public function actionGetGqlToken(): Response
    {
        $result = [];
        $tokens = Craft::$app->getGql()->getTokens();
        foreach ($tokens as $token) {
            if (in_array($token->name, self::GQL_TOKEN_NAMES)) {
                $result[$token->name] = $token->accessToken;
            }
        }

        return $this->asJson($result);
    }

    /**
     * Return all of the field options from the passed in array of $fieldHandles
     *
     * @return Response
     */
    public function actionGetFieldOptions(): Response
    {
        $result = [];
        $request = Craft::$app->getRequest();
        $fieldHandles = $request->getBodyParam('fieldHandles');
        foreach ($fieldHandles as $fieldHandle) {
            $field = Craft::$app->getFields()->getFieldByHandle($fieldHandle);
            if ($field) {
                $result[$fieldHandle] = $field->options;
            }
        }

        return $this->asJson($result);
    }

    /**
     * Return a form layout for provided $formHandle
     *
     * @return Response
     */
    public function actionGetFormLayout(): Response
    {
        $request = Craft::$app->getRequest();
        $formHandle = $request->getBodyParam('formHandle');
        if ($formHandle) {
            $form = Freeform::getInstance()->forms->getFormByHandle($formHandle);
            if ($form) {
                $formData = json_decode($form->layoutJson, true);
                $formData['hash'] = $form->getForm()->getHash();
                return $this->asJson($formData);
            }
        }
        return $this->asJson([]);
    }

    /**
     * Return how many upvotes an element has.
     *
     * @return Response
     *
     * @throws \yii\base\ExitException
     */
    public function actionGetHearts(): Response
    {
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('id');
        if ($id) {
            $tally = Upvote::$plugin->upvote_query->tally($id, 'heart');
            if ($tally) {
                return $this->asJson([ 'success' => true, 'votes' => $tally ]);
            }
        }
        return $this->asJson([ 'success' => false ]);
    }

    /**
     * Add a vote to an element.
     *
     * @return Response
     */
    public function actionAddHeart(): Response
    {
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('id');
        if ($id) {
            $votes = Upvote::$plugin->upvote_vote->castVote($id, 'heart', 1);
            if ($votes) {
                return $this->asJson([ 'success' => true, 'votes' => $votes['tally'] ]);
            }
        }
        return $this->asJson([ 'success' => false ]);
    }

    /**
     * Remove a vote from an element.
     *
     * @return Response
     */
    public function actionRemoveHeart(): Response
    {
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('id');
        if ($id) {
            try {
                $votes = Upvote::$plugin->upvote_vote->removeVote($id, 'heart', 1);
                if ($votes) {
                    return $this->asJson(['success' => true, 'votes' => $votes['tally']]);
                }
            } catch(\Exception $e) {

            }
        }
        return $this->asJson([ 'success' => false ]);
    }
}