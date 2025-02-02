import { Dimension, MinecraftDimensionTypes, Player, system, Vector3 } from "@minecraft/server";
import { BiomeTags, CaveBiomesTag, AllTags } from "./BiomeTags";

Player.prototype.climb = function () {
  const block = this.dimension.getBlock(this.location);
  if (!block?.hasTag("betterend:can_climb")) return;

  this.isJumping && !this.isSneaking
    ? this.applyKnockback(0, 0, 0, 0.2)
    : this.applyKnockback(0, 0, 0, -0.06);

  if (this.isSneaking && !this.isJumping) {
    this.applyKnockback(0, 0, 0, 0.04);
  }
};

class PlayerUtils {
  private player: Player;
  private dimension: Dimension;
  private location: Vector3;
  constructor(player: Player) {
    this.player = player;
    this.dimension = player.dimension;
    this.location = player.location;
  }

  waila() {
    const block = this.player.getBlockFromViewDirection({
      maxDistance: 8,
    })?.block;
    if (block) {
      this.player.onScreenDisplay.setActionBar(`Id: ${block.typeId}, Tags: ${block.getTags()}`);
    }
  }

  sky() {
    const nebula = 'animation.nebula.moving';
    this.player.playAnimation(nebula);
  }

  ambientStuff() {
    const biome = this.getBiome();
    if (!biome) return;
    const { fog, music, sound, biomeTag: tag } = biome;
    if (this.player.hasTag(tag)) return;
    else {
      for (let i = 0; i < AllTags.length; i++) {
        this.player.removeTag(AllTags[i]);
      }
      const id = this.player.getDynamicProperty('betterend:ambient_stuff_id');
      id ? system.clearRun(id as number) : null;
      this.player.addTag(tag);
      this.player.runCommandAsync(`fog @s remove end_fog`);
      this.player.runCommandAsync(`fog @s push ${fog} end_fog`);
      this.playMusic(music, sound);
    }
  }

  joinSky() {
    const player = this.player;
    const isInTheEnd = player.getDynamicProperty('betterend:in_the_end');
    if (isInTheEnd) {
      if (player.isSprinting || player.isJumping) {
        player.setDynamicProperty('betterend:in_the_end', false);
        this.sky();
      }
    }
  }

  fallVelocity() {
    const player = this.player;
    const { dimension, location } = player;
    if (player.isFalling) {
      const vel = player.getVelocity().y;
      player.setDynamicProperty('betterend:fall_velocity', 0 + Math.abs(vel));
      const block = dimension.getBlock(location);
      const mem = 'betterend:umbrella_tree_membrane';
      for (let i = 0; i < 4; i++) {
        if (block.below(i)?.typeId === mem) {
          player.addEffect('resistance', 5, { showParticles: false, amplifier: 255 });
        }
      }
    }
  }

  climb() {
    this.player.climb();
  }

  private getBiome() {
    if (this.dimension.id !== MinecraftDimensionTypes.theEnd) return;
  
    for (let i = 50; i <= 94; i++) {
        const block = this.dimension.getBlock({
            x: this.location.x,
            y: i,
            z: this.location.z
        });
        // y >= 50 | for land biomes
        if (this.location.y >= 50) {
            for (const tag of AllTags) {
                if (block.hasTag(tag)) {
                    const biomeData = BiomeTags.find(biome => biome.tag === tag);
                    if (biomeData) {
                        const { fog, sound, music, tag: biomeTag } = biomeData;
                        return { fog, sound, music, biomeTag };
                    }
                }
            }
        }
    }
  }

  private playMusic(music: string, sound: string) {
    const id = system.runInterval(() => {
      this.player.setDynamicProperty('betterend:ambient_stuff_id', id);
      this.player.runCommandAsync(`stopsound @s`);
      system.waitTicks(20);
      this.player.playSound(sound, { location: this.player.location });
      system.waitTicks(20);
      this.player.playSound(music, { location: this.player.location, volume: 0.3 });
    }, 6000);
  }
}

export default PlayerUtils;
