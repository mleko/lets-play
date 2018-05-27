<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\Game $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getId(), $format, $context),
            "name" => $value->getName(),
            "matchSetId" => $this->subNormalize($value->getMatchSetId(), $format, $context),
            "ownerId" => $this->subNormalize($value->getOwnerId(), $format, $context),
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, Type $type, string $format, array $context = []) {
        $uuidType = Type::fromString(Uuid::class);
        return new \Mleko\LetsPlay\Entity\Game(
            $data["name"],
            $this->subDeNormalize($data["matchSetId"], $uuidType, $format, $context),
            $this->subDeNormalize($data["ownerId"], $uuidType, $format, $context),
            $this->subDeNormalize($data["id"], $uuidType, $format, $context)
        );
    }

    public function canProcess(Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\Game::class === $type->getName();
    }

}
