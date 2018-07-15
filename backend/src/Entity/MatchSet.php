<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Mleko\LetsPlay\ValueObject\Uuid;

class MatchSet
{
    /** @var Uuid */
    private $id;
    /** @var Uuid */
    private $ownerId;
    /** @var string */
    private $name;
    /** @var Collection|Match[] */
    private $matches;
    /** @var boolean */
    private $public;

    /**
     * MatchSet constructor.
     * @param string $name
     * @param Uuid $ownerId
     * @param Uuid $id
     * @param bool $public
     */
    public function __construct(string $name, Uuid $ownerId, Uuid $id = null, bool $public = false) {
        $this->name = $name;
        $this->ownerId = $ownerId;
        $this->id = $id ?: new Uuid();
        $this->public = $public;

        $this->matches = new ArrayCollection();
    }

    public function getId(): Uuid {
        return $this->id;
    }

    public function getOwnerId(): Uuid {
        return $this->ownerId;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function isPublic(): bool {
        return $this->public;
    }

    public function setPublic(bool $public): void {
        $this->public = $public;
    }

    /**
     * @return Match[]
     */
    public function getMatches(): array {
        $matches = $this->matches->toArray();
        \usort($matches, function (Match $a, Match $b) {
            return $a->getStartDate() <=> $b->getStartDate();
        });
        return $matches;
    }

    /**
     * @param Match[] $matches
     */
    public function setMatches(array $matches) {
        $this->matches = new ArrayCollection($matches);
    }

}
