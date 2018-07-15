<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\MatchScore;
use Mleko\LetsPlay\ValueObject\MatchTeam;
use Mleko\LetsPlay\ValueObject\Uuid;

class Match
{
    /** @var MatchTeam */
    private $home;
    /** @var MatchTeam */
    private $away;
    /** @var \DateTimeImmutable */
    private $startDate;
    /** @var Uuid */
    private $id;
    /** @var MatchSet */
    private $set;

    /**
     * Match constructor.
     * @param MatchTeam $home
     * @param MatchTeam $away
     * @param \DateTimeImmutable $startDate
     * @param MatchSet $set
     * @param Uuid|null $id
     */
    public function __construct(MatchTeam $home, MatchTeam $away, \DateTimeImmutable $startDate, MatchSet $set, ?Uuid $id = null) {
        $this->home = $home;
        $this->away = $away;
        $this->startDate = $startDate;
        $this->set = $set;
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

    /**
     * @return \DateTimeImmutable
     */
    public function getStartDate(): \DateTimeImmutable {
        return $this->startDate;
    }

    /**
     * @param \DateTimeImmutable $startDate
     */
    public function setStartDate(\DateTimeImmutable $startDate): void {
        $this->startDate = $startDate;
    }

    public function isLocked(\DateTimeImmutable $now = null): bool {
        $now = $now ?: new \DateTimeImmutable();
        return $now >= $this->startDate;
    }

    public function getResult(): ?MatchScore {
        if (null === $this->home->getScore() || null === $this->away->getScore()) {
            return null;
        }
        return new MatchScore(
            $this->home->getScore(),
            $this->away->getScore()
        );
    }
}
