<?php

switch (getenv('ENVIRONMENT')) {
    case "production":
        $labelColor = '#cc5643';
        break;
    case "staging":
        $labelColor = '#FFC300';
        break;
    case "dev":
        $labelColor = '#22C665';
}
return [

    'showLabel' => true,
    'labelText' => getenv('ENVIRONMENT'). " // ",
    'prefixText' => getenv('SYSTEM_NAME'). " // ",
    'suffixText' => "Front End URL: ". getenv('FRONTEND_SITE_URL'),
    'labelColor' => $labelColor,
    'textColor' => '#ffffff',
    'targetSelector' => '#global-header:before',

];