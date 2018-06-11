<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Command;


use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class MigrateGameUsers extends Command
{
    /** @var GameUserRepository[] */
    private $repositories;

    /**
     * @param GameUserRepository[] $repositories
     */
    public function __construct(array $repositories) {
        parent::__construct("letsplay:migrate:game-users");
        $this->repositories = $repositories;
        $availableStorages = \implode(", ", \array_keys($repositories));
        $this->addArgument("source", InputArgument::REQUIRED, "Source storage, possible values: " . $availableStorages);
        $this->addArgument("destination", InputArgument::REQUIRED, "Destination storage, possible values: " . $availableStorages);
    }

    /**
     * @inheritDoc
     */
    protected function execute(InputInterface $input, OutputInterface $output) {
        $sourceId = $input->getArgument("source");
        $destinationId = $input->getArgument("destination");
        if (!isset($this->repositories[$sourceId], $this->repositories[$destinationId])) {
            $output->writeln(sprintf("<error>Only valid source/destinations are: %s</error>", \implode(", ", \array_keys($this->repositories))));
            return false;
        }
        if ($sourceId === $destinationId) {
            $output->writeln("<error>Source have to be different than destination</error>");
            return false;
        }
        $source = $this->repositories[$sourceId];
        $destination = $this->repositories[$destinationId];

        $gameUsers = $source->getAll();
        $output->writeln(\sprintf("%d gameUsers to migrate", \count($gameUsers)));
        foreach ($gameUsers as $gameUser) {
            $destination->save($gameUser);
        }
        $output->writeln("<info>Done</info>");
    }


}
