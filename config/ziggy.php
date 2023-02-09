<?php

return [
    'skip-route-function' => true,
    'groups' => [
        'admin' => [
            'admin.*',
            'auth.*',
            'locale.*',
            'user.*',
            'ip.*',
            'grid.*',
            'global.*',
            'token.*',
        ],
        'main' => [
            'auth.*',
            'admin.user.*',
            'admin.role.*',
            'email-verification.send',
            'exchange-trade.*',
            'locale.*',
            'user.*',
            'ip.*',
            'grid.*',
            'global.*',
            'wallet.*',
            'token.*',
            'feature-limit.*',
            'stake-plan.*',
            'stake.*',
            'payment.*',
            'giftcard.*',
            'peer-payment.*',
            'peer-offer.*',
            'peer-trade.*',
            'bank.*',
        ],
        'installer' => [
            'installer.*',
        ]
    ],
];
