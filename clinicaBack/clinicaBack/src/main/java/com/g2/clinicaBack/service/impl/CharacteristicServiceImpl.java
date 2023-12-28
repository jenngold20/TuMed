package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.dto.CharacteristicDto;
import com.g2.clinicaBack.mapper.CharacteristicMaper;
import com.g2.clinicaBack.models.Characteristic;
import com.g2.clinicaBack.repository.CharacteristicRespository;
import com.g2.clinicaBack.service.CharacteristicService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CharacteristicServiceImpl implements CharacteristicService {

    private final CharacteristicRespository characteristicRespository;

    public CharacteristicServiceImpl(CharacteristicRespository characteristicRespository) {
        this.characteristicRespository = characteristicRespository;
    }

    @Override
    public CharacteristicDto createCharacteristic(CharacteristicDto characteristicDto) {
        Characteristic characteristic = CharacteristicMaper.toCharacteristic(characteristicDto);
        characteristic = characteristicRespository.save(characteristic);
        return CharacteristicMaper.toCharacteristicDto(characteristic);
    }

    @Override
    public CharacteristicDto getCharacteristicById(Long characteristicId) {
        Characteristic characteristic = characteristicRespository.findById(characteristicId).orElse(null);
        return CharacteristicMaper.toCharacteristicDto(characteristic);
    }

    @Override
    public List<CharacteristicDto> getAllCharacteristics() {
        List<Characteristic> characteristics = characteristicRespository.findAll();
        return characteristics.stream()
                .map(CharacteristicMaper::toCharacteristicDto)
                .collect(Collectors.toList());
    }

    @Override
    public CharacteristicDto updateCharacteristic(Long characteristicId, CharacteristicDto characteristicDto) {
        Characteristic existingCharacteristic = characteristicRespository.findById(characteristicId).orElse(null);
        if (existingCharacteristic == null) {
            // Lanza una excepción o devuelve un valor especial para indicar que el doctor no existe.
            return null;
        }

        // Actualiza los atributos del doctor existente con los valores del DTO.
        existingCharacteristic.setName(characteristicDto.getName());
        existingCharacteristic.setAsset(characteristicDto.getAsset());
        existingCharacteristic.setIcon(characteristicDto.getIcon());


        // Guarda los cambios en el doctor.
        existingCharacteristic = characteristicRespository.save(existingCharacteristic);

        return CharacteristicMaper.toCharacteristicDto(existingCharacteristic);
    }

    @Override
    public void deleteCharacteristic(Long characteristicId) {
        characteristicRespository.deleteById(characteristicId);
    }
}
