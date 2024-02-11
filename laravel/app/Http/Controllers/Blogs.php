<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Blog;
use Throwable;
use Illuminate\Support\Facades\Storage;

class Blogs extends Controller
{
    //
    private $output = ["error" => 0, 'code' => null, 'message' => null, 'data' => null];

    public function create(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|min:5',
            'body' => 'required|min:5',
            // 'user_id' => 'required|integer',
            'photo' => 'required|mimes:png,jpeg,jpg|max:5048'

        ]);
        if ($validator->errors()->isEmpty()) {
            try {
                if ($request->file('photo')) {
                    $fileName = Str::uuid() . '.' . $request->photo->getClientOriginalExtension();
                    $filePath = $request->file('photo')->storeAs('blogs', $fileName, 'public');
                    $file_path =  $filePath;
                }

                $obj = Blog::create([
                    'title' => $request->title,
                    'body_text' => $request->body,
                    'user_id' => 1, //$request->user_id,
                    'photo' => $fileName ?? null,
                    'file_path' => $file_path ?? null,
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

    public function get()
    {

        try {
            //select('id','user_id','title','body_text','photo','created_at')
            $this->output["data"] = Blog::with('user')->active()->orderBy('id', 'desc')->get();
        } catch (Throwable $e) {
            $this->output["error"] = 1;
            $this->output["message"] = $e->getMessage();
            $this->output["code"] = $e->getCode();
        }
        return response($this->output, 200);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);
        if ($validator->errors()->isEmpty()) {
            try {
                $this->output["data"] =  Blog::with('user')
                    ->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('body_text', 'like', '%' . $request->search . '%')
                    ->active()
                    ->get();
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

    public function show($param)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {
            try {
                $this->output["data"] = Blog::with('user')->findOrFail($id);
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
    public function update($param, Request $request)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'body' => 'required',
                'photo' => 'mimes:png,jpeg,jpg|max:5048|nullable'

            ]);
            if ($validator->errors()->isEmpty()) {

                try {
                    $fileName = null;
                    $file_path = null;
                    $old = Blog::findOrFail($id);

                    if ($request->file('photo')) {

                        if (Storage::disk('public')->exists($old->file_path)) {
                            Storage::disk('public')->delete($old->file_path);
                        }

                        $fileName = Str::uuid() . '.' . $request->photo->getClientOriginalExtension();
                        $file_path = $request->file('photo')->storeAs('blogs', $fileName, 'public');
                    }


                    $obj = Blog::where('id',  $old->id)->update([
                        'title' => $request->title,
                        'body_text' => $request->body,
                        'photo' =>  is_null($fileName) ? Str::after($old->file_path, 'blogs/') : $fileName,
                        'file_path' => is_null($file_path) ? $old->file_path : $file_path,
                        'alive' => 1,

                    ]);

                    if ($obj) {
                        $this->output["message"] = 'success';
                        $this->output["data"] = $old->id;
                    } else {
                        $this->output["error"] = 1;
                        $this->output["message"] = 'unable to update';
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
        } else {
            $this->output["error"] = 1;
            $this->output["message"] = 'Invalid ID';
        }
        return response(json_encode($this->output), 200)->header('Content-Type', 'application/json');
    }
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if ($validator->errors()->isEmpty()) {
            try {
                if (Blog::where('id', $request->id)->update(['alive' => 0]))    $this->output["message"] = 'success';
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
