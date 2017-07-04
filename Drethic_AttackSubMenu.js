//=============================================================================
// Drethic Plugins
// Drethic_AttackSubMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.Drethic_AttackSubMenu = true;

var Drethic = Drethic || {};
Drethic.ASM = Drethic.ASM || {};
Drethic.ASM.version = 0.01;

//=============================================================================
 /*:
 * @plugindesc v0.01 Attack plugin that lets you turn the attack command into a
 * sub-menu tree so that each attack retains the main attack animations.
 * @author Drethic
 *
 * @help
 */
 //=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Drethic.Parameters = PluginManager.parameters('Drethic_AttackSubMenu');
Drethic.Param = Drethic.Param || {};
Drethic.Icon = Drethic.Icon || {};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addAttackCommand = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'moves', true, stypeId);
    }, this);
};

Drethic.ASM.addSkillCommands = Window_ActorCommand.prototype.addSkillCommands;
Window_ActorCommand.prototype.addSkillCommands = function() {
    // Removing Skill commands since they are now part of the Attack Commands
    // @TODO Add in option to return the skills screen
    return;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Drethic.ASM.Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Drethic.ASM.Scene_Battle_createActorCommandWindow.call(this);
    var win = this._actorCommandWindow;
    win.setHandler('moves',  this.commandMoves.bind(this));
};

Scene_Battle.prototype.commandMoves = function() {
    this._skillWindow.setActor(BattleManager.actor());
    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
    this._skillWindow.refresh();
    this._skillWindow.show();
    this._skillWindow.activate();
};
