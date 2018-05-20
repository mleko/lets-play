<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\ValueObject;


class MatchScore
{
    /** @var int */
    private $home;
    /** @var int */
    private $away;

    /**
     * GameScore constructor.
     * @param int $home
     * @param int $away
     */
    public function __construct(int $home, int $away) {
        $this->home = $home;
        $this->away = $away;
    }

    /**
     * @return int
     */
    public function getHome(): int {
        return $this->home;
    }

    /**
     * @return int
     */
    public function getAway(): int {
        return $this->away;
    }

    public function equals($score): bool {
        if (!($score instanceof MatchScore)) {
            return false;
        }
        return $score->home === $this->home && $score->away === $this->away;
    }

}
