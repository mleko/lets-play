<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Normalizer;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Normalizer\PartialNormalizer;
use Mleko\LetsPlay\ValueObject\Uuid;

class UserNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\User $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getId(), $format, $context),
            "name" => $value->getName(),
            "email" => $value->getEmail(),
            "hash" => $value->getPassHash()
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        return new User(
            $data["name"],
            $data["email"],
            $data["hash"],
            $this->subDeNormalize($data["id"], Type::fromString(Uuid::class), $format, $context)
        );
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\User::class === $type->getName();
    }


}
