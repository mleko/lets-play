<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Http;


use Mleko\Alchemist\Serializer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ResponseListener implements EventSubscriberInterface
{
    /** @var Serializer */
    private $serializer;

    /**
     * ResponseListener constructor.
     * @param Serializer $serializer
     */
    public function __construct(Serializer $serializer) {
        $this->serializer = $serializer;
    }

    /**
     * @inheritdoc
     */
    public static function getSubscribedEvents() {
        return [
            KernelEvents::VIEW => "onKernelView"
        ];
    }

    public function onKernelView(GetResponseForControllerResultEvent $event) {
        $result = $event->getControllerResult();
        if ($result instanceof Response) {
            $event->setResponse(
                new \Symfony\Component\HttpFoundation\Response(
                    $this->serializer->serialize($result, "json"), $result->getStatusCode()
                )
            );
        }
    }
}
