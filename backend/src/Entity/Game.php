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

    public function __construct(string $name, Uuid $matchSetId, Uuid $id = null) {
        $this->name = $name;
        $this->matchSetId = $matchSetId;
        $this->id = $id ?? new Uuid();
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

}
