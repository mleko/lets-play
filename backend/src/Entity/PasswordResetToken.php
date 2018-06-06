<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\Uuid;

class PasswordResetToken
{
    /** @var Uuid */
    private $userId;
    /** @var string */
    private $token;
    /** @var boolean */
    private $used;
    /** @var \DateTimeImmutable */
    private $expirationDate;

    /**
     * PasswordResetToken constructor.
     * @param Uuid $userId
     * @param string $token
     * @param \DateTimeImmutable $expirationDate
     * @param bool $used
     */
    public function __construct(Uuid $userId, string $token, \DateTimeImmutable $expirationDate = null, bool $used = false) {
        $this->userId = $userId;
        $this->token = $token;
        $this->expirationDate = $expirationDate;
        $this->used = $used;
    }

    public function getUserId(): Uuid {
        return $this->userId;
    }

    public function getToken(): string {
        return $this->token;
    }

    public function isUsed(): bool {
        return $this->used;
    }

    public function getExpirationDate(): \DateTimeImmutable {
        return $this->expirationDate;
    }

    public function markAsUsed() {
        $this->used = true;
    }

    public function isValid(\DateTimeImmutable $now = null): bool {
        $now = $now ?: new \DateTimeImmutable();
        return $this->used == false && $now <= $this->expirationDate;
    }

}
