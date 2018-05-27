<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\Uuid;

class Game
{
    /** @var Uuid */
    private $id;
    /** @var string */
    private $name;
    /** @var Uuid */
    private $matchSetId;
    /** @var Uuid */
    private $ownerId;

    public function __construct(string $name, Uuid $matchSetId, Uuid $ownerId, Uuid $id = null) {
        $this->name = $name;
        $this->matchSetId = $matchSetId;
        $this->id = $id ?? new Uuid();
        $this->ownerId = $ownerId;
    }

    public function getId(): Uuid {
        return $this->id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getMatchSetId(): Uuid {
        return $this->matchSetId;
    }

    public function getOwnerId(): Uuid {
        return $this->ownerId;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void {
        $this->name = $name;
    }

}
