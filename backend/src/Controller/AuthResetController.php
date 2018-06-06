<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\PasswordResetToken;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\PasswordResetTokenRepository;
use Mleko\LetsPlay\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Zend\Mail\Message;
use Zend\Mail\Transport\TransportInterface;
use Zend\Mime\Mime;
use Zend\Mime\Part;

class AuthResetController
{
    /** @var UserRepository */
    private $userRepository;
    /** @var PasswordResetTokenRepository */
    private $tokenRepository;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     * @param PasswordResetTokenRepository $passwordResetTokenRepository
     */
    public function __construct(UserRepository $userRepository, PasswordResetTokenRepository $passwordResetTokenRepository) {
        $this->userRepository = $userRepository;
        $this->tokenRepository = $passwordResetTokenRepository;
    }

    public function createResetToken(Request $request, TransportInterface $transport) {
        $data = \json_decode($request->getContent(), true);
        $email = $data["email"];
        $user = $this->userRepository->findUserByEmail($email);
        if (!$user) {
            return new Response(null, false, 404);
        }
        $code = \base_convert(\sha1(\time() . \mt_rand()), 16, 36);
        $token = new PasswordResetToken($user->getId(), $code, new \DateTimeImmutable("+7 days"));
        $this->tokenRepository->save($token);

        $message = new Message();
        $message->setTo($email);
        $message->addFrom("no-reply@lets-play.pl", "Lets Play");
        $message->setSubject("Reset hasła - Lets-Play");
        $content = new Part(sprintf(
            "Hej\n\nPoprosiłeś o reset hasła.\nPoniżej znajduje się link do formularza resetu\n%s\n\nDobrej zabawy",
            $request->getUriForPath("/#/auth/reset/" . $token->getToken())
        ));
        $content->charset = "UTF-8";
        $content->setType(Mime::TYPE_TEXT);
        $mimeMessage = new \Zend\Mime\Message();
        $mimeMessage->addPart($content);
        $message->setBody($mimeMessage);
        $transport->send($message);

        return new Response(null, true, 201);
    }

    public function resetPassword(Request $request) {
        $data = \json_decode($request->getContent(), true);
        $token = $this->tokenRepository->find($data["token"]);
        if (!$token || !$token->isValid()) {
            return new Response(false, false, 404);
        }
        $user = $this->userRepository->getUser($token->getUserId());
        if (!$user) {
            return new Response(null, false, 404);
        }
        $user->setPassHash(User::hashPassword($data["password"]));
        $token->markAsUsed();
        $this->tokenRepository->save($token);

        $this->userRepository->saveUser($user);

        return new Response(null, true, 200);
    }
}
