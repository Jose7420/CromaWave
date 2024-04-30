<?php

namespace App\Http\Controllers\API;

use App\Filtres\UserFiltre;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function index(Request $request)
    {

        $filter = new UserFiltre();
        $queryItems = $filter->transform($request);
        $users = User::where($queryItems);
        return new UserResource($users->paginate()->appends($request->query()));

        // $users = User::filter($filter)->paginate();
        // $users = User::paginate();

        // if($users->isEmpty()){
        //     return response()->json(['message' => 'No users found'], 200);
        // }
        // return response()->json($users,200);

        // $data = [
        //     'users' => $users,
        //     'status' => 200,
        //     'message' => 'Users retrieved successfully'
        // ];

        // return response()->json($data, 200);

        return new UserResource($users);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'email' => 'required|email',
        //     'password' => 'required'
        // ]);


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {

            $data = [
                'status' => 400,
                'message' => 'Validation error',
                'error' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        if (!$user) {
            $data = [
                'status' => 500,
                'message' => 'User not created'
            ];
            return response()->json($data, 500);
        }



        $data = [
            'user' => $user,
            'status' => 201,
            'message' => 'User created successfully'
        ];

        return response()->json($data, 201);
    }


    public function show($id)
    {
       $user = User::find($id);

       // retorna el usuario con sus carritos y los datos del propietario.
       return $user ? new UserResource($user->loadMissing('carritos')->loadMissing('carritos.propietario'))
       : response()->json(['status'=> 404,'message' => 'User not found'], 404);


    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            $data = [
                'status' => 404,
                'message' => 'User not found'
            ];
            return response()->json($data, 404);
        }


        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }

        // $user->name = $request->name;
        // $user->email = $request->email;
        // $user->password = bcrypt($request->password);

        $user->save();

        $data = [
            'user' => $user,
            'status' => 200,
            'message' => 'User updated successfully'
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            $data = [
                'status' => 404,
                'message' => 'User not found'
            ];
            return response()->json($data, 404);
        }

        $user->delete();

        $data = [
            'status' => 200,
            'message' => 'User deleted successfully'
        ];

        return response()->json($data, 200);
    }
}
