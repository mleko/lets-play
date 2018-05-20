<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Logic;


use Mleko\LetsPlay\ValueObject\MatchScore;

class ScoreCalculator
{
    public function calculateScore(MatchScore $result, MatchScore $bet): int {
        $resultDiff = $result->getHome() - $result->getAway();
        $resultPoints = $result->getHome() + $result->getAway();

        $betDiff = $bet->getHome() - $bet->getAway();
        $betPoints = $bet->getHome() + $bet->getAway();

        if ($resultDiff === $betDiff && $resultPoints === $betPoints) {
            // 3 point for direct hit
            return 3;
        } elseif ($this->sign($resultDiff) === $this->sign($betDiff)) {
            // 1 point for correct result
            return 1;
        }
        return 0;
    }

    private function sign($number): int {
        return $number <=> 0;
    }
}
