<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Http;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;

class ExceptionListener
{
    public function onKernelException(GetResponseForExceptionEvent $event) {
        // You get the exception object from the received event
        $exception = $event->getException();
        if ($exception instanceof AuthenticationCredentialsNotFoundException) {
            $event->setResponse(new JsonResponse(["success" => false], \Symfony\Component\HttpFoundation\Response::HTTP_UNAUTHORIZED));
        }
    }
}
