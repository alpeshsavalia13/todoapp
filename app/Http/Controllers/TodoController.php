<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    // List all todos of authenticated user
    public function index(Request $request)
    {
        $todos = $request->user()->todos()->orderBy('created_at', 'desc')->get();
        return response()->json($todos);
    }

    // Add new todo
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($todo);
    }

    // Update existing todo (title or completed)
    public function update(Request $request, $id)
    {
        $todo = Todo::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $todo->update($request->only('title', 'completed'));

        return response()->json($todo);
    }

    // Delete a todo
    public function destroy(Request $request, $id)
    {
        $todo = Todo::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
