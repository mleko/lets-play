<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\Game;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Normalizer\PartialNormalizer;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameInviteNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\Game\GameInvite $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getId(), $format, $context),
            "gameId" => $this->subNormalize($value->getGameId(), $format, $context),
            "status" => $value->getStatus()
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, Type $type, string $format, array $context = []) {
        return new \Mleko\LetsPlay\Entity\Game\GameInvite(
            $this->subDeNormalize($data["gameId"], Type::fromString(Uuid::class), $format, $context),
            $this->subDeNormalize($data["id"], Type::fromString(Uuid::class), $format, $context),
            (int)$data["status"]
        );
    }

    public function canProcess(Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\Game\GameInvite::class === $type->getName();
    }

}
