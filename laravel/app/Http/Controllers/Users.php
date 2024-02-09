<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;
use Throwable;


class Users extends Controller
{
    private $output = ["error" => 0, 'code' => null, 'message' => null, 'data' => null];

    public function test()
    {


        // return User::find($request->user()->id)->blogs()->get();
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:255',
        ]);
        if ($validator->errors()->isEmpty()) {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                $this->output["error"] = 1;
                $this->output["message"] = 'The provided credentials are incorrect.';
            } else {
                $this->output["message"] = 'success';
                //Str::lower($request->email.'|'.$request->ip())
                $this->output["data"] = $user->createToken($request->email)->plainTextToken;
            }
        } else {
            $this->output["error"] = 1;
            $this->output["message"] = $validator->errors()->all();
        }
        return response($this->output, 200);
    }

    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|max:255',
            'photo' => 'mimes:png,jpeg,jpg|max:2048'

        ]);
        if ($validator->errors()->isEmpty()) {

            try {
                if ($request->file()) {
                    $fileName = Str::uuid() . '.' . $request->photo->getClientOriginalExtension();
                    $filePath = $request->file('photo')->storeAs('profiles', $fileName, 'public');
                    $file_path =  $filePath;
                }

                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'photo' => $fileName,
                    'file_path' => $file_path,
                ]);

                if ($user) {
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
            $this->output["message"] = 'fail';
            $this->output["data"] = $validator->errors();
        }
        return response($this->output, 200);
    }


    public function update($param, Request $request)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|email',
                'photo' => 'mimes:png,jpeg,jpg|max:2048'

            ]);
            if ($validator->errors()->isEmpty()) {

                try {
                    if (User::where('id', $id)->update($request->all()))    $this->output["message"] = 'success';
                    else {
                        $this->output["error"] = 1;
                        $this->output["message"] = 'unable to update';
                    }
                } catch (Throwable $e) {
                    $this->output["error"] = 1;
                    $this->output["message"] = $e->getMessage();
                    $this->output["code"] = $e->getCode();
                }

                return json_encode($this->output);
            } else {
                $this->output["error"] = 1;
                $this->output["message"] = 'fail';
                $this->output["data"] = $validator->errors();
                return json_encode($this->output);
            }
        } else {
            $this->output["error"] = 1;
            $this->output["message"] = 'Invalid ID';
        }
        return response($this->output, 200);
    }
    public function get()
    {
        $obj = new User();
        try {
            $this->output["data"]  = $obj->active()->get();
        } catch (Throwable $e) {
            $this->output["error"] = 1;
            $this->output["message"] = $e->getMessage();
            $this->output["code"] = $e->getCode();
        }

        return response($this->output, 200);
    }

    public function show($param)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {

            $obj = new User();
            try {
                $this->output["data"] = $obj->findOrFail($id);
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

    public function delete($param)
    {
        $id = (int) $param;
        if (is_int($id) && $id > 0) {
            try {
                if (User::where('id', $id)->update(['alive' => 0]))    $this->output["message"] = 'success';
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

    public function logout(Request $request)
    {

        if ($request->user()->currentAccessToken()->delete()) {

            return true;
        } else return false;
    }
}
