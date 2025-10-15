<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MilkExpense extends Model
{
    use HasFactory;

    public $table = "milk_expense";

    protected $fillable = ['user_id', 'month', 'total_ltr', 'per_ltr_price', 'total_amount', 'day_wise_ltr'];

    protected $casts = [
        'day_wise_ltr' => 'array'
    ];

    public $perLtrPrice = 50;

    public function getCreatedAtAttribute($value) {
        return date("Y-m-d H:i:s", strtotime($value));
    }

    public function setMonthAttribute($value) {
        if (!empty($value)) {
            $this->attributes['month'] = date("Y-m", strtotime($value));
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setDayWiseLtrAttribute($value) {
        $totalLtr = 0;
        $perLtrPrice = $this->perLtrPrice;
        if (!empty($value)) {
            foreach($value as $dayWiseLtr) {
                if (isset($dayWiseLtr['morning'])) {
                    $totalLtr += $dayWiseLtr['morning'];
                }
                if (isset($dayWiseLtr['evening'])) {
                    $totalLtr += $dayWiseLtr['evening'];
                }
            }
        }

        if ($totalLtr > 0) {
            $this->attributes['total_ltr'] = $totalLtr;
            $this->attributes['total_amount'] = $totalLtr * $perLtrPrice;
            $this->attributes['per_ltr_price'] = $perLtrPrice;
        }

        $this->attributes['day_wise_ltr'] = json_encode($value);
    }

    public static function insertOrUpdate($attributes = [], $params)
    {
        if (empty($params)) {
            return false;
        }

        $params = array_intersect_key($params, array_flip((new self())->fillable));
        //$ret = self::updateOrCreate($attributes, $params);
        $record = self::firstOrNew($attributes);
        //$record->fill($params); // This will call your mutator
        foreach ($params as $key => $value) {
            $record->{$key} = $value; // this triggers mutators individually
        }
        $record->save();
        return $record;
    }
}
