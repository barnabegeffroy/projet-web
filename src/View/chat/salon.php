<div class="col-12 text-center mt-5">
    <h1 class="text-dark pt-4">Messagerie</h1>
</div>
<?php
$data = $chatRepository->getConvFromId($_GET['idConv']);
$userSessionId = $authenticatorService->getCurrentUserId();
if (empty($data)) : ?>
    <h3>Annonce introuvable</h3>
<?php elseif ($data['id1'] !== $userSessionId && $data['id2'] !== $userSessionId) : ?>
    <h3>Accès refusé</h3>
<?php else :
    $other = $userRepository->getIdentity($data['id1'] !== $userSessionId ? $data['id1'] : $data['id2']);
    $messages = $chatRepository->getMessagesFromConvId($_GET['idConv']); ?>
    <p class="lead">
        Conversation avec <?php echo $other['prenom'] . (isset($other['pseudo']) ? ' \'' . $other['pseudo'] . '\' ' : ' ') . $other['nom']; ?>
    </p>
    <div class="border-top border-primary w-25 mx-auto my-3"></div>
    <?php foreach ($messages as &$message)
        if ($message->getIdAuteur() == $userSessionId) : ?>
        <div class="text-right">
            <p class="lead"><?php echo $message->getDate() ?></p>
            <div><?php echo $message->getDescription() ?></div>
        </div>

    <?php else : ?>
        <div class="text-left">
            <p class="lead"><?php echo $message->getDate() ?></p>
            <div><?php echo $message->getDescription() ?></div>
        </div>

    <?php endif; ?>
    <form action="addMessage.php" method="POST">
        <input type="hidden" name="ref_conv" value="<?php echo $data['id'] ?>">
        <input type="hidden" name="idAnnonce" value="<?php echo $data['idannonce'] ?>">
        <input type="hidden" name="idAuteur" value="<?php echo $userSessionId ?>">
        <input class="form-control" type='string' autocomplete="off" placeholder="Ecrivez votre message..." name="message"></input>
        <button class="btn btn-outline-dark btn-md my-1" type="submit" name="Rejoindre" value="<?php echo $id; ?>">Envoyer</button>
    </form>
<?php endif; ?>