<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->setRedirectMacros();
        $this->setBuilderMacros();
    }

    /**
     * Bind redirect macros
     *
     * @return void
     */
    protected function setRedirectMacros()
    {
        RedirectResponse::macro('notify', function ($message, $type = 'info') {
            return $this->with('notification', compact('type', 'message'));
        });
    }

    /**
     * Bind builder macros
     *
     * @return void
     */
    protected function setBuilderMacros()
    {
        Builder::macro('autoPaginate', function(){
            return paginate($this, Request::instance());
        });

        Relation::macro('autoPaginate', function(){
            return paginate($this, Request::instance());
        });
    }
}
