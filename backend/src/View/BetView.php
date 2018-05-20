<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\View;


class BetView
{
    /** @var \Mleko\LetsPlay\Entity\Bet */
    private $bet;
    /** @var int|null */
    private $points;

    /**
     * BetView constructor.
     * @param \Mleko\LetsPlay\Entity\Bet $bet
     * @param int|null $points
     */
    public function __construct(\Mleko\LetsPlay\Entity\Bet $bet, ?int $points) {
        $this->bet = $bet;
        $this->points = $points;
    }

    /**
     * @return \Mleko\LetsPlay\Entity\Bet
     */
    public function getBet(): \Mleko\LetsPlay\Entity\Bet {
        return $this->bet;
    }

    /**
     * @return int|null
     */
    public function getPoints(): ?int {
        return $this->points;
    }
}
