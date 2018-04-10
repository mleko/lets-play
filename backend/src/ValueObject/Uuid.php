<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\ValueObject;


class Uuid
{
    /** @var string */
    private $uuid;

    /**
     * Uuid constructor.
     * @param string|null $uuid
     */
    public function __construct($uuid = null) {
        if (null === $uuid) {
            $this->uuid = \Ramsey\Uuid\Uuid::uuid4()->toString();
        } else {

            if (!\Ramsey\Uuid\Uuid::isValid($uuid)) {
                throw new \InvalidArgumentException("Invalid UUID: $uuid");
            }
            $this->uuid = $uuid;
        }
    }

    /**
     * @return string
     */
    public function getUuid() {
        return $this->uuid;
    }

    public function __toString() {
        return $this->uuid;
    }

}
