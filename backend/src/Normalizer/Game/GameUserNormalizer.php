<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\Game;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Normalizer\PartialNormalizer;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameUserNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\Game\GameUser $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "userId" => $this->subNormalize($value->getUserId(), $format, $context),
            "gameId" => $this->subNormalize($value->getGameId(), $format, $context)
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, Type $type, string $format, array $context = []) {
        return new \Mleko\LetsPlay\Entity\Game\GameUser(
            $this->subDeNormalize($data["gameId"], Type::fromString(Uuid::class), $format, $context),
            $this->subDeNormalize($data["userId"], Type::fromString(Uuid::class), $format, $context)
        );
    }

    public function canProcess(Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\Game\GameUser::class === $type->getName();
    }

}
