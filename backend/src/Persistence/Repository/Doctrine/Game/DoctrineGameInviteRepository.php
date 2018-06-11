<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine\Game;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Repository\Game\GameInviteRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineGameInviteRepository implements GameInviteRepository
{
    /** @var EntityRepository */
    private $entityRepository;
    /** @var EntityManagerInterface */
    private $entityManager;

    /**
     * DoctrineUserRepository constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
        $this->entityRepository = $entityManager->getRepository(GameInvite::class);
    }

    public function listGameInvites(Uuid $gameId) {
        $this->entityRepository->findBy(["gameId" => $gameId]);
    }

    public function save(GameInvite $invite) {
        $this->entityManager->persist($invite);
        $this->entityManager->flush();
    }

    public function getGameInvitation(string $invitationId) {
        return $this->entityRepository->find($invitationId);
    }

    /**
     * @return GameInvite[]
     */
    public function getAll() {
        return $this->entityRepository->findAll();
    }
}
