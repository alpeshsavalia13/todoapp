<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;

class ExpenseController extends Controller
{
    // List all todos of authenticated user
    public function index(Request $request)
    {
        $todos = $request->user()->expense()->orderBy('created_at', 'desc')->get();
        return response()->json($todos);
    }

    // Add new todo
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'sometimes|required',
        ]);

        $todo = Expense::create([
            'title' => $request->title,
            'user_id' => $request->user()->id,
            'date'  => $request->date,
            'amount'  => $request->amount
        ]);

        return response()->json($todo);
    }

    // Update existing todo (title or completed)
    public function update(Request $request, $id)
    {
        $expense = Expense::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required',
        ]);

        $expense->update($request->only('title', 'amount', 'date'));

        return response()->json($expense);
    }

    // Delete a Expense
    public function destroy(Request $request, $id)
    {
        $expense = Expense::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully']);
    }
}
