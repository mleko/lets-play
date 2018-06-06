<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Normalizer;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Entity\PasswordResetToken;
use Mleko\LetsPlay\Normalizer\PartialNormalizer;
use Mleko\LetsPlay\ValueObject\Uuid;

class PasswordResetTokenNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param PasswordResetToken $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "token" => $value->getToken(),
            "userId" => $this->subNormalize($value->getUserId(), $format, $context),
            "used" => $value->isUsed(),
            "expirationDate" => $this->subNormalize($value->getExpirationDate(), $format, $context)
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        return new PasswordResetToken(
            $this->subDeNormalize($data["userId"], Type::fromString(Uuid::class), $format, $context),
            $data["token"],
            $this->subDeNormalize($data["expirationDate"], Type::fromString(\DateTimeImmutable::class), $format, $context),
            $data["used"]
        );
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return PasswordResetToken::class === $type->getName();
    }


}
