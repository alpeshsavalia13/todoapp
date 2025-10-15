<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MilkExpense;

class MilkExpenseController extends Controller
{
    // List all todos of authenticated user
    public function index(Request $request)
    {
        $list = $request->user()->milkexpense()->orderBy('created_at', 'desc')->get();

        if ($list) {
            foreach ($list as $l) {
                $l->name = $l->user && $l->user->name ? $l->user->name : '';
            }
            unset($l);
        }
        return response()->json($list);
    }

    // Add new todo
    public function store(Request $request)
    {
        $request->validate([
            'day_wise_ltr' => 'required'
        ]);

        $params = $request->all();
        if (!isset($params['user_id'])) {
            $params['user_id'] = $request->user()->id;
        }

        $model   = MilkExpense::insertOrUpdate(['id' => 0], $params);

        $model->name = $model->user->name ?? '';

        return response()->json($model);
    }

    // Update existing todo (title or completed)
    public function update(Request $request, $id)
    {
        $expense = MilkExpense::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate([
            'day_wise_ltr' => 'required'
        ]);

        $params = $request->all();
        if (!isset($params['user_id'])) {
            $params['user_id'] = $request->user()->id;
        }

        $model   = MilkExpense::insertOrUpdate(['id' => $id], $params);
        $model->name = $model->user->name ?? '';

        return response()->json($model);
    }

    // Delete a Expense
    public function destroy(Request $request, $id)
    {
        $expense = MilkExpense::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully']);
    }
}
