<?php

namespace App\Http\Controllers\Rests;

use App\Config;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConfigRestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $configs = Config::all();
        if (isset($configs)) {
        	$jdata = [
        		'data' => $configs,
		        'status' => 'success',
		        'message' => __('api.messages.get_success')
	        ];
        } else {
        	$jdata = [
        		'status' => 'error',
		        'message' => __('api.messages.get_error')
	        ];
        }

        return response()->json($jdata, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
	    $config = Config::find($id);
	    if (isset($config)) {
		    $jdata = [
			    'data' => $config->first(),
			    'status' => 'success',
			    'message' => __('api.messages.get_success')
		    ];
	    } else {
		    $jdata = [
			    'status' => 'error',
			    'message' => __('api.messages.get_error')
		    ];
	    }
	    

	    return response()->json($jdata, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
