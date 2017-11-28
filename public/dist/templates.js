angular.module("mufcg").run(["$templateCache",function(a){a.put("components/components/map-modal.html",'<div class="modal-header" id="map-modal"><h3 class="modal-title" style="font-weight: bold">Mapa do campus</h3></div><div class="modal-body" id="modal-body"><div class="col-xs-offset-1 col-md-offset-3" map-lazy-load="https://maps.googleapis.com/maps/api/js" map-lazy-load-params="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg-DgACUXO_nUZ5W9A5VHe2H0wD-9tycs"><ng-map center="-7.214250, -35.909188" zoom="17" min-zoom="17" style="height: 600px; width: 700px" on-dragend="dragLimit()" on-click="createMarker()"></ng-map></div><br><div class="col-xs-offset-1 col-md-offset-3" style="font-weight: bolder; padding-left: 30px">Clique no mapa no local da ocorrência ou em \'Me ache\' para te acharmos automaticamente</div></div><div class="modal-footer"><button class="btn btn-lg btn-info" style="float: left" ng-click="getLocation()"><i class="fa fa-map-marker" aria-hidden="true" style="margin-right: 5px"></i><span style="font-weight: bold">Me ache</span></button> <button class="btn btn-lg btn-success" type="button" ng-click="ok()">Salvar</button> <button class="btn btn-lg btn-warning" type="button" ng-click="cancel()">Cancelar</button></div>'),a.put("components/pages/create-request.html",'<div class="row" style="margin-top: 50px"><div class="col-md-3 col-md-offset-4 col-sm-10 col-sm-offset-1"><div class="panel panel-info" style="min-height: 550px"><div class="div" style="margin: 20px"><form action=""><h3 class="col-xs-offset-4" style="margin-bottom: 30px">Criar solicitação</h3><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon">Título</span> <input focus-on-show class="form-control input-lg" name="Título" value="" placeholder="título" ng-model="request.title"></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon">Descrição:</span><textarea class="form-control" placeholder="Descreva brevemente o problema" ng-model="request.description" style="height: 100px; resize: none"></textarea></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon">Prioridade</span><select class="form-control" style="height: 45px" ng-model="request.priority"><option value="high">Alta</option><option value="regular">Média</option><option value="low">Baixa</option></select></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon">Referência</span> <input focus-on-show class="form-control input-lg" name="Descrição do local" value="" placeholder="descrição da localização" ng-model="request.location.description"></div><input type="file" ng-model="request.img" base-sixty-four-input><div class="input-group" style="margin-bottom: 25px; width: 10%"><span class="input-group-addon">Localização</span> <span class="input-group-btn"><a class="btn btn-info btn-lg" ng-click="pop()"><i class="fa fa-map-marker" aria-hidden="true"></i></a></span></div><div style="float : right" style="bottom: 40px"><a class="btn btn-primary btn-lg" style="margin-right: 10px" href="/#!/home">Voltar</a> <a class="btn btn-success btn-lg" ng-click="create()">Cadastrar</a></div></form></div></div></div></div>'),a.put("components/pages/home.html",'<link rel="stylesheet" href="styles/home.css"><div map-lazy-load="https://maps.googleapis.com/maps/api/js" map-lazy-load-params="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg-DgACUXO_nUZ5W9A5VHe2H0wD-9tycs" ng-init="initMap()" style="margin-top: -20px; min-width: 400px"><ng-map center="-7.214850, -35.907788" zoom="17" min-zoom="17" style="width: 100%; height: auto" on-dragend="dragLimit()"></ng-map></div>'),a.put("components/pages/login.html",'<logo></logo><div class="row" style="margin-top: 50px"><div class="col-md-3 col-md-offset-4 col-sm-10 col-sm-offset-1"><div class="panel panel-primary" style="min-height: 280px"><div class="div" style="margin: 20px"><form><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input focus-on-show class="form-control input-lg" name="Matrícula" placeholder="matrícula" ng-model="registration"></div><div style="margin-bottom: 15px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" class="form-control input-lg" name="password" placeholder="senha" ng-model="password"></div><div style="margin: 0px 0px 10px 10px" class="form-check"><label class="form-check-label" style="font-size: 1.3em"><input class="form-check-input" type="checkbox" style="vertical-align: bottom; height: 30px; width: 30px"> Manter conectado</label></div><div style="float : right" style="bottom: 40px"><a class="btn btn-info btn-lg" style="margin-right: 10px" href="/register">Registrar</a> <a class="btn btn-success btn-lg" ng-click="login()">Entrar</a></div></form></div></div></div></div>'),a.put("components/pages/register.html",'<logo></logo><div class="row" style="margin-top: 50px"><div class="col-md-5 col-md-offset-3 col-sm-10 col-sm-offset-1"><div class="panel panel-info" style="min-height: 450px"><div class="div" style="margin: 20px"><form><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input focus-on-show class="form-control input-lg" name="nome" value="" placeholder="nome" ng-model="user.name"></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span> <input type="e-mail" class="form-control input-lg" name="email" placeholder="e-mail" ng-model="user.email"></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-book"></i></span> <input focus-on-show class="form-control input-lg" name="identification" value="" placeholder="matrícula" ng-model="user.registration"></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" class="form-control input-lg" name="password" placeholder="digite sua senha" ng-model="user.password"></div><div style="margin-bottom: 25px" class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input type="password" class="form-control input-lg" name="confirme password" placeholder="digite mais uma vez sua senha" ng-model="confirmPassword"></div><div style="float : right" style="bottom: 40px"><a class="btn btn-danger btn-lg" style="margin-right: 10px" href="/login">Voltar</a> <button class="btn btn-success btn-lg" ng-click="register()">Registrar</button></div></form></div></div></div></div>'),a.put("components/directives/logo/logo.html",'<div class="row" style="margin-top: 50px"><div class="col-md-3 col-md-offset-5 col-sm-4 col-sm-offset-5"><img src="https://lh3.ggpht.com/A0x3jzuH1qRkE10HcTiT4qQr_6iAqVg-CTsoIqxnoIFyv92V91WI3KqiVlOvLtfoMRg=w300" alt="" height="150px"><h1 style="font-family: \'Poiret One\', cursive; margin-left: -30px">Minha UFCG</h1></div></div>'),a.put("components/directives/nav-bar/nav-bar.html",'<link rel="stylesheet" href="/styles/nav-bar.css"><nav class="navbar navbar-default" ng-if="enabled"><div class="container-fluid">\x3c!-- Brand and toggle get grouped for better mobile display --\x3e<div class="navbar-header"><a class="navbar-brand form-inline" href="/home"><img style="display:inline" src="https://lh3.ggpht.com/A0x3jzuH1qRkE10HcTiT4qQr_6iAqVg-CTsoIqxnoIFyv92V91WI3KqiVlOvLtfoMRg=w300" alt="" height="50px"> <span style="font-family: \'Poiret One\', cursive">MinhaUFCG</span></a></div><ul class="nav navbar-nav navbar-right"><li ng-class="isActive(\'create\')"><a href="/request/create">Nova solicitação</a></li><li ng-class="isActive(\'history\')"><a href="#">Histórico</a></li></ul></div></nav>')}]);