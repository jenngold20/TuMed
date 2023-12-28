package com.g2.clinicaBack.controllers;

import com.g2.clinicaBack.dto.CharacteristicDto;
import com.g2.clinicaBack.service.CharacteristicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/characteristics")
@CrossOrigin(origins="*")
public class CharacteristicController {

    private final CharacteristicService characteristicService;

    public CharacteristicController(CharacteristicService characteristicService) {
        this.characteristicService = characteristicService;
    }

    @GetMapping("/{characteristicId}")
    public ResponseEntity<CharacteristicDto> getCharacteristicById(@PathVariable Long characteristicId) {
        CharacteristicDto characteristicDto = characteristicService.getCharacteristicById(characteristicId);
        if (characteristicDto != null) {
            return new ResponseEntity<>(characteristicDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CharacteristicDto>> getAllCharacteristics() {
        List<CharacteristicDto> characteristics = characteristicService.getAllCharacteristics();
        return new ResponseEntity<>(characteristics, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CharacteristicDto> createCharacteristic(@RequestBody CharacteristicDto characteristicDto){
        CharacteristicDto createCharacteristic = characteristicService.createCharacteristic(characteristicDto);
        return new ResponseEntity<>(createCharacteristic, HttpStatus.CREATED);

    }

    @PutMapping("/{characteristicId}")
    public ResponseEntity<CharacteristicDto> updateCharacteristic(
            @PathVariable Long characteristicId,
            @RequestBody CharacteristicDto characteristicDto
    ){
        CharacteristicDto updateCharacteristic = characteristicService.updateCharacteristic(characteristicId, characteristicDto);
        return new ResponseEntity<>(updateCharacteristic, HttpStatus.CREATED);
    }

    @DeleteMapping("/{characteristicId}")
    public ResponseEntity<Void> deleteCharacteristic(@PathVariable Long characteristicId) {
        characteristicService.deleteCharacteristic(characteristicId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

