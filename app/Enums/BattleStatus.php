<?php

namespace App\Enums;

enum BattleStatus: string
{
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case TIMEOUT = 'timeout';
}
