<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Command;


use Mleko\LetsPlay\Repository\GameRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class MigrateGames extends Command
{
    /** @var GameRepository[] */
    private $repositories;

    /**
     * @param GameRepository[] $repositories
     */
    public function __construct(array $repositories) {
        parent::__construct("letsplay:migrate:games");
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

        $games = $source->getGames();
        $output->writeln(\sprintf("%d games to migrate", \count($games)));
        foreach ($games as $game) {
            $destination->save($game);
        }
        $output->writeln("<info>Done</info>");
    }


}
