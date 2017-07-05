<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    public $timestamps = false;

    public function findConfigByKey($config_key = null ) {
    	return Config::where('config_key', $config_key);
    }

}
