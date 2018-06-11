<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\ValueObject\MatchScore;

class BetNormalizer extends PartialNormalizer
{

    /**
     * @inheritdoc
     * @param Bet $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "gameId" => $this->subNormalize($value->getGameId(), $format, $context),
            "matchId" => $this->subNormalize($value->getMatchId(), $format, $context),
            "userId" => $this->subNormalize($value->getUserId(), $format, $context),
            "bet" => $this->subNormalize($value->getBet(), $format, $context),
            "dateTime" => $this->subNormalize($value->getDatetime(), $format, $context),
            "id" => $this->subNormalize($value->getId(), $format, $context)
        ];
    }

    /**
     * @inheritdoc
     */
    public function denormalize($data, Type $type, string $format, array $context = []) {
        $uuidType = Type::fromString(\Mleko\LetsPlay\ValueObject\Uuid::class);
        return new Bet(
            $this->subDeNormalize($data["userId"], $uuidType, $format, $context),
            $this->subDeNormalize($data["gameId"], $uuidType, $format, $context),
            $this->subDeNormalize($data["matchId"], $uuidType, $format, $context),
            $this->subDeNormalize($data["bet"], Type::fromString(MatchScore::class), $format, $context),
            $this->subDeNormalize($data["dateTime"], Type::fromString(\DateTimeImmutable::class), $format, $context),
            isset($data["id"]) ? $this->subDeNormalize($data["id"], $uuidType, $format, $context) : null
        );
    }

    public function canProcess(Type $type, string $format): bool {
        return Bet::class === $type->getName();
    }
}
