<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\ValueObject\Uuid;

interface MatchSetRepository
{
    public function save(MatchSet $matchSet);

    /**
     * @return MatchSet[]
     */
    public function getSets(): array;

    public function getSet(Uuid $setId): ?MatchSet;

    public function getUserSets(User $user, $includePublic = false);
}
