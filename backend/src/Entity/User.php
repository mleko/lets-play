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
    private $passHash;
    /** @var string */
    private $emailHash;

    /**
     * User constructor.
     * @param string $name
     * @param string $emailHash
     * @param string $passHash
     * @param Uuid $id
     */
    public function __construct(string $name, string $emailHash, string $passHash, Uuid $id = null) {
        $this->name = $name;
        $this->emailHash = $emailHash;
        $this->passHash = $passHash;
        $this->id = $id ?: new Uuid();
    }

    /**
     * @param string $email
     * @return string
     */
    public static function hashEmail(string $email): string {
        return \base64_encode(\sha1("a8698a7e853559622396e39813bc58ba" . \mb_strtolower($email), true));
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
    public function getEmailHash(): string {
        return $this->emailHash;
    }

    /**
     * @return string
     */
    public function getPassHash(): string {
        return $this->passHash;
    }

}
