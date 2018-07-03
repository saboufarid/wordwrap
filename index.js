/*
Word Wrap API
Vous venez de passer le premier entretien avec les RH, vous voici maintenant face à face avec le CTO qui hésite encore à vous recruter. Montrez-lui votre talent et votre détermination en relevant son test technique.

Sujet
Implémentez et déployez une API REST qui ajoute des retours à la ligne tous les 80 caractères à un texte passé en paramètre. Si un mot est coupé, un tiret sera alors ajouté.

Inscription
L’api doit utiliser un mécanisme d’authentification via token unique. L'inscription via /api/sign_up retournera un token.

Requête POST : /api/sign_up

{
  "email": "farid@lereacteur.io",
  "password": "azerty"
}
Réponse :
{
  "token": "u6C1HwUH45qQvT5e"
}
Word Wrap
La longueur des lignes du texte doit être de 80 caractères. l'appel à /api/word-wrap devra retournera un texte justifié suite à une requête POST.

Il doit y avoir un rate limit par token pour l’endpoint /api/word-wrap, fixé à 80 000 mots par jour, en cas de dépassement il faudra renvoyer une erreur 402 Payment Required.

Requête POST : /api/word-wrap

{
  "text":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate mollis massa, eget facilisis purus convallis eget. Cras id odio tristique, congue nibh a, feugiat lorem. Duis eleifend efficitur ipsum, eu placerat tellus malesuada non. Ut dictum nulla non rutrum hendrerit. Nullam tempus nisi at leo dignissim rutrum. Etiam lobortis ex at felis iaculis ullamcorper. Maecenas et erat dignissim, porta dui dapibus, maximus metus. Nam odio metus, vehicula ut lectus ac, sagittis volutpat tellus. Duis condimentum nisi eget mauris ultrices consequat. Suspendisse id sagittis nisl. Etiam laoreet odio at tincidunt maximus. Nulla facilisi. Nunc augue tortor, tristique sit amet ante vel, consequat congue sem. Nullam in pretium arcu, ut hendrerit ipsum. Aliquam erat volutpat."
}
Réponse :
{
  "wrapped":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate mo-\n
llis massa, eget facilisis purus convallis eget. Cras id odio tristique, cong-\n
ue nibh a, feugiat lorem. Duis eleifend efficitur ipsum, eu placerat tellus m-\n
alesuada non. Ut dictum nulla non rutrum hendrerit. Nullam tempus nisi at leo \n
dignissim rutrum. Etiam lobortis ex at felis iaculis ullamcorper. Maecenas et \n
erat dignissim, porta dui dapibus, maximus metus. Nam odio metus, vehicula ut \n
lectus ac, sagittis volutpat tellus. Duis condimentum nisi eget mauris ultric-\n
es consequat. Suspendisse id sagittis nisl. Etiam laoreet odio at tincidunt m-\n
aximus. Nulla facilisi. Nunc augue tortor, tristique sit amet ante vel, conse-\n
quat congue sem. Nullam in pretium arcu, ut hendrerit ipsum. Aliquam erat vol-\n
utpat."
}
Le token sera transmis en même temps que la requête afin d'authentifier l'utilisateur.
*/

let mongoose = require("mongoose");
let server = require("./server");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/wordwrap"
);

server.start();
