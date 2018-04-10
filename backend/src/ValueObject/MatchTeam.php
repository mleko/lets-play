<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\ValueObject;


class MatchTeam
{
    /** @var string */
    private $name;
    /** @var int|null */
    private $score;

    public function __construct(string $name, ?int $score = null) {
        $this->name = $name;
        $this->score = $score;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getScore(): ?int {
        return $this->score;
    }

    public function setScore(?int $score): void {
        $this->score = $score;
    }
}
