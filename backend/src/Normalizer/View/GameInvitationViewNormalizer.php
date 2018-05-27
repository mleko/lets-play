<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\View;


use Mleko\LetsPlay\View\GameInvitationView;

class GameInvitationViewNormalizer extends \Mleko\LetsPlay\Normalizer\PartialNormalizer
{

    /**
     * @inheritdoc
     * @param GameInvitationView $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getInvitation()->getId(), $format, $context),
            "game" => $this->subNormalize($value->getGame(), $format, $context)
        ];
    }

    /**
     * @param array|integer|double|string|boolean|null $data
     * @param \Mleko\Alchemist\Type $type
     * @param string $format
     * @param array $context
     * @return mixed
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        // TODO: Implement denormalize() method.
        throw new \RuntimeException("Unimplemented method " . __CLASS__ . "::" . __METHOD__);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return GameInvitationView::class === $type->getName();
    }
}
