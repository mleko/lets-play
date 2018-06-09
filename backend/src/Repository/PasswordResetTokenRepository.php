<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

use Mleko\LetsPlay\Entity\PasswordResetToken;

interface PasswordResetTokenRepository
{
    public function save(PasswordResetToken $token);

    public function find(string $token): ?PasswordResetToken;
}
