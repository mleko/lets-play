<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\MatchTeam;
use Mleko\LetsPlay\ValueObject\Uuid;

class Match
{
    /** @var MatchTeam */
    private $home;
    /** @var MatchTeam */
    private $away;
    /** @var Uuid */
    private $id;

    /**
     * Match constructor.
     * @param MatchTeam $home
     * @param MatchTeam $away
     * @param Uuid|null $id
     */
    public function __construct(MatchTeam $home, MatchTeam $away, ?Uuid $id = null) {
        $this->home = $home;
        $this->away = $away;
        $this->id = $id ?: new Uuid();
    }

    public function getId(): Uuid {
        return $this->id;
    }

    /**
     * @return MatchTeam
     */
    public function getHome(): MatchTeam {
        return $this->home;
    }

    /**
     * @return MatchTeam
     */
    public function getAway(): MatchTeam {
        return $this->away;
    }
}
