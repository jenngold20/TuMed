package com.g2.clinicaBack.mapper;

import com.g2.clinicaBack.dto.CharacteristicDto;
import com.g2.clinicaBack.models.Characteristic;
import org.springframework.stereotype.Component;

@Component
public class CharacteristicMaper {

    public static CharacteristicDto toCharacteristicDto(Characteristic characteristic){
        CharacteristicDto characteristicDto = new CharacteristicDto();
        characteristicDto.setCharacteristicId(characteristic.getCharacteristicId());
        characteristicDto.setIcon(characteristic.getIcon());
        characteristicDto.setName(characteristic.getName());
        characteristicDto.setAsset(characteristic.getAsset());
        return characteristicDto;
    }

    public static Characteristic toCharacteristic(CharacteristicDto characteristicDto){
        Characteristic characteristic = new Characteristic();
        characteristic.setCharacteristicId(characteristicDto.getCharacteristicId());
        characteristic.setAsset(characteristicDto.getAsset());
        characteristic.setIcon(characteristicDto.getIcon());
        characteristic.setName(characteristicDto.getName());
        return characteristic;
    }


}
