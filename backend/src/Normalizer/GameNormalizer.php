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
            "matchSetId" => $this->subNormalize($value->getMatchSetId(), $format, $context)
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, Type $type, string $format, array $context = []) {
        return new \Mleko\LetsPlay\Entity\Game(
            $data["name"],
            $this->subDeNormalize($data["matchSetId"], Type::fromString(Uuid::class), $format, $context),
            $this->subDeNormalize($data["id"], Type::fromString(Uuid::class), $format, $context)
        );
    }

    public function canProcess(Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\Game::class === $type->getName();
    }

}
