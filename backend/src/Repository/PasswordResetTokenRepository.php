<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\LetsPlay\Entity\PasswordResetToken;

class PasswordResetTokenRepository extends StorageRepository
{

    public function save(PasswordResetToken $token) {
        $elements = $this->getElements();
        $elements[$token->getToken()] = $token;
        $this->saveElements($elements);
    }

    public function find(string $token): ?PasswordResetToken {
        /** @var PasswordResetToken[] $elements */
        $elements = $this->getElements();
        return \array_key_exists($token, $elements) ? $elements[$token] : null;
    }

    protected function getElementClassName(): string {
        return PasswordResetToken::class;
    }

    protected function getStorageKey(): string {
        return "password.reset.tokens";
    }
}
