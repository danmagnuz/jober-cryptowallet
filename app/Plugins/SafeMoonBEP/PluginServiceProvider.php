<?php

namespace App\Plugins\SafeMoonBEP;

use App\Abstracts\TokenServiceProvider;

class PluginServiceProvider extends TokenServiceProvider
{
    /**
     * @inheritDoc
     */
    protected function getAdapter()
    {
        return CoinAdapter::class;
    }

    /**
     * @inheritDoc
     */
    protected function configName()
    {
        return CoinAdapter::configName();
    }

    /**
     * @inheritDoc
     */
    protected function resourcePath()
    {
        return __DIR__ . '/resources';
    }
}
