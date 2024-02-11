<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use Illuminate\Http\Request;
use Throwable;

class Comments extends Controller
{
    private $output = ["error" => 0, 'code' => null, 'message' => null, 'data' => null];
    public function get($param)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {
        try {
            $this->output["data"]  = Comment::where('blog_id',$id)->active()->with('user')->get();
        } catch (Throwable $e) {
            $this->output["error"] = 1;
            $this->output["message"] = $e->getMessage();
            $this->output["code"] = $e->getCode();
        }
    } else {
        $this->output["error"] = 1;
        $this->output["message"] = 'Invalid ID';
    }
        return response($this->output, 200);
    }
    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'blog_id' => 'required|integer',
            'comment' => 'required|min:10',
        ]);
        if ($validator->errors()->isEmpty()) {

            try {
                $obj = Comment::create([
                    'user_id' => $request->user()->id,
                    'blog_id' => $request->blog_id,
                    'comment' => $request->comment,
                   
                ]);

                if ($obj) {
                    $this->output["message"] = 'success';
                } else {
                    $this->output["error"] = 1;
                    $this->output["message"] = 'unable to save data';
                }
            } catch (Throwable $e) {
                $this->output["error"] = 1;
                $this->output["message"] = $e->getMessage();
                $this->output["code"] = $e->getCode();
            }
        } else {
            $this->output["error"] = 1;
            $this->output["message"] = $validator->errors()->all();
        }
        return response($this->output, 200);
    }
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);
        if ($validator->errors()->isEmpty()) {
            try {
                if (Comment::where('id', $request->id)->update(['alive' => 0]))    $this->output["message"] = 'success';
                else {
                    $this->output["error"] = 1;
                    $this->output["message"] = 'no record found';
                }
            } catch (Throwable $e) {
                $this->output["error"] = 1;
                $this->output["message"] = $e->getMessage();
                $this->output["code"] = $e->getCode();
            }
        } else {
            $this->output["error"] = 1;
            $this->output["message"] = 'Invalid ID';
        }
        return response($this->output, 200);
    }
}
