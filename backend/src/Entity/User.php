<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\Uuid;

class User
{
    /** @var Uuid */
    private $id;
    /** @var string */
    private $name;
    /** @var string */
    private $email;
    /** @var string */
    private $passHash;

    /**
     * User constructor.
     * @param Uuid $id
     * @param string $name
     * @param string $email
     * @param string $passHash
     */
    public function __construct(string $name, string $email, string $passHash, Uuid $id = null) {
        $this->name = $name;
        $this->email = $email;
        $this->passHash = $passHash;
        $this->id = $id ?: new Uuid();
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getEmail(): string {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPassHash(): string {
        return $this->passHash;
    }

}
